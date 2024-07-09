using MediatR;
using awqaf.Dto;
using awqaf.Domain;

namespace awqaf.Application.Commands
{
    public class AccountSettingChangeCommand : IRequest<User>
    {
        public bool notificationSetting { get; set; }
        public string expoKey { get; set; }
        public string lang { get; set; }
    }
}
