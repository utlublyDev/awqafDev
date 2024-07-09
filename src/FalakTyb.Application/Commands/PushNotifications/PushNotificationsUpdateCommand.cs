
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class PushNotificationsUpdateCommand : IRequest<PushNotifications>
    {
        public PushNotifications PushNotifications { get; set; }
    }
}
