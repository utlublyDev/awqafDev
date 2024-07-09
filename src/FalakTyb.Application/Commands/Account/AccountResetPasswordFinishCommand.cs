using awqaf.Domain;
using MediatR;
using awqaf.Dto;

namespace awqaf.Application.Commands
{
    public class AccountResetPasswordFinishCommand : IRequest<User>
    {
        public KeyAndPasswordDto KeyAndPasswordDto { get; set; }
    }
}
