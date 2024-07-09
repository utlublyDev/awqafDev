using MediatR;
using awqaf.Dto;

namespace awqaf.Application.Commands
{
    public class AccountChangePasswordCommand : IRequest<Unit>
    {
        public PasswordChangeDto PasswordChangeDto { get; set; }
    }
}
