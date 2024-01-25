using Domain;

namespace Application;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<Activity, ActivityDto>()
            .ForMember(
                d => d.HostUsername,
                o => o.MapFrom(s => s.Attenddees.FirstOrDefault(x => x.IsHost).AppUser.UserName)
            );
        CreateMap<ActivityAttenddee, AttenddeeDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(
                d => d.Image,
                o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url)
            );
        ;
        CreateMap<AppUser, Profile>()
            .ForMember(
                d => d.Image,
                o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url)
            );
        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(
                d => d.Image,
                o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url)
            );
        ;
    }
}
