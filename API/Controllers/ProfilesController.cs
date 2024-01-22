using Application;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class ProfilesController : BaseApiController
{
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
        return HandleResult(await Mediator.Send(new DetailsProfile.Query { Username = username }));
    }
}
