using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure;

public class IsHostRequirements : IAuthorizationRequirement { }

public class IsHostRequirementsHandler : AuthorizationHandler<IsHostRequirements>
{
    private readonly DataContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public IsHostRequirementsHandler(
        DataContext dbContext,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _httpContextAccessor = httpContextAccessor;
        _dbContext = dbContext;
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        IsHostRequirements requirement
    )
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Task.CompletedTask;

        var activityId = Guid.Parse(
            _httpContextAccessor
                .HttpContext?.Request
                .RouteValues.SingleOrDefault(x => x.Key == "id")
                .Value?.ToString()
        );

        var attendee = _dbContext
            .Attendees.AsNoTracking()
            .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId)
            .Result;

        if (attendee == null)
            return Task.CompletedTask;

        if (attendee.IsHost)
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
