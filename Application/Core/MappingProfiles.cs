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
        CreateMap<ActivityAttenddee, Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
    }
}
