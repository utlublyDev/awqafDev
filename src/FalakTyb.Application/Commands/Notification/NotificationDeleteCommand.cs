using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class NotificationDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
