using Application;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class PhotosController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] Add.Commad commad)
    {
        return HandleResult(await Mediator.Send(commad));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        return HandleResult(await Mediator.Send(new DeletePhoto.Command { Id = id }));
    }

    [HttpPost("{id}/setMain")]
    public async Task<IActionResult> SetMain(string id)
    {
        return HandleResult(await Mediator.Send(new SetMain.Command { Id = id }));
    }
}
