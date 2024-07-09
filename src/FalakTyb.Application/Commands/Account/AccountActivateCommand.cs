using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class AccountActivateCommand : IRequest<User>
    {
        public string Key { get; set; }
    }
}
