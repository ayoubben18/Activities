using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application;

public class UpdateAttenddence
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context
                .Activities.Include(a => a.Attenddees)
                .ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (activity == null)
                return null;

            var user = await _context.Users.FirstOrDefaultAsync(
                x => x.UserName == _userAccessor.GetUsername()
            );
            if (user == null)
                return null;

            var hostUsername = activity.Attenddees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;
            var attendance = activity.Attenddees.FirstOrDefault(
                x => x.AppUser.UserName == user.UserName
            );

            if (attendance != null && hostUsername == user.UserName)
                activity.IsCancelled = !activity.IsCancelled;

            if (attendance != null && hostUsername != user.UserName)
                activity.Attenddees.Remove(attendance);

            if (attendance == null)
            {
                attendance = new ActivityAttenddee
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = false,
                };
                activity.Attenddees.Add(attendance);
            }

            var result = await _context.SaveChangesAsync() > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating attendance");
        }
    }
}
