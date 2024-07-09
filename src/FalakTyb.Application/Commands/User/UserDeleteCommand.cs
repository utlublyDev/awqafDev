using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class UserDeleteCommand : IRequest<Unit>
    {
        public string Login { get; set; }
    }
}
