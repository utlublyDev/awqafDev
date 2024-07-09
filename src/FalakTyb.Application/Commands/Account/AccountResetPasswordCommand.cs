using MediatR;

namespace awqaf.Application.Commands
{
    public class AccountResetPasswordCommand : IRequest<Unit>
    {
        public string Mail { get; set; }
    }
}
