
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class NotificationCreateCommand : IRequest<Notification>
    {
        public Notification Notification { get; set; }
    }
}
