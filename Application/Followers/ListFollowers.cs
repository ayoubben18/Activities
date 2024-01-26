using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application;

public class ListFollowers
{
    public class Query : IRequest<Result<List<Profile>>>
    {
        public string Predicate { get; set; }
        public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Profile>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<List<Profile>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var profiles = new List<Profile>();
            switch (request.Predicate)
            {
                case "followers":
                    profiles = await _context
                        .UserFollowings.Where(x => x.Target.UserName == request.Username)
                        .Select(u => u.Observer)
                        .ProjectTo<Profile>(
                            _mapper.ConfigurationProvider,
                            new { currentUsername = _userAccessor.GetUsername() }
                        )
                        .ToListAsync();
                    break;

                case "following":
                    profiles = await _context
                        .UserFollowings.Where(x => x.Observer.UserName == request.Username)
                        .Select(u => u.Target)
                        .ProjectTo<Profile>(
                            _mapper.ConfigurationProvider,
                            new { currentUsername = _userAccessor.GetUsername() }
                        )
                        .ToListAsync();
                    break;
            }

            return Result<List<Profile>>.Success(profiles);
        }
    }
}
