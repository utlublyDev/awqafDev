using awqaf.Domain.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using awqaf.Domain;

namespace awqaf.Application.Commands
{
    public class AccountSettingChangeCommandHandler : IRequestHandler<AccountSettingChangeCommand, User>
    {
        private readonly IUserService _userService;

        public AccountSettingChangeCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<User> Handle(AccountSettingChangeCommand command, CancellationToken cancellationToken)
        {
           var user= await _userService.NotificationSettingUpdate(command.notificationSetting,command.expoKey,command.lang);
            return user;
        }
    }
}
