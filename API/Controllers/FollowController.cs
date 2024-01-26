using Application;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class FollowController : BaseApiController
{
    [HttpPost("{username}")]
    public async Task<IActionResult> Follow(string username)
    {
        return HandleResult(
            await Mediator.Send(new FollowToggle.Command { TargetUsername = username })
        );
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetFollowings(string predicate, string username)
    {
        return HandleResult(
            await Mediator.Send(
                new ListFollowers.Query { Username = username, Predicate = predicate }
            )
        );
    }
}
