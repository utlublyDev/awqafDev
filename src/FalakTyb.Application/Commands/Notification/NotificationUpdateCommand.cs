
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class NotificationUpdateCommand : IRequest<Notification>
    {
        public Notification Notification { get; set; }
    }
}
