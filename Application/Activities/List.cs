using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application;

public class List
{
    public class Query : IRequest<Result<List<Activity>>> { }

    public class Handler : IRequestHandler<Query, Result<List<Activity>>>
    {
        private readonly DataContext _context;
        private readonly ILogger _logger;

        public Handler(DataContext context, ILogger<List> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Result<List<Activity>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var activities = await _context.Activities.ToListAsync(cancellationToken);
            return Result<List<Activity>>.Success(activities);
        }
    }
}
