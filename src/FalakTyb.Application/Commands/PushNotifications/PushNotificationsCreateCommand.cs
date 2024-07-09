
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class PushNotificationsCreateCommand : IRequest<PushNotifications>
    {
        public PushNotifications PushNotifications { get; set; }
    }
}
