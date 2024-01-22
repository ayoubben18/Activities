using Microsoft.AspNetCore.Http;

namespace Application;

public interface IPhotoAccessor
{
    Task<PhotoUploadResult> AddPhoto(IFormFile file);

    Task<string> DeletePhoto(string publicId);
}
