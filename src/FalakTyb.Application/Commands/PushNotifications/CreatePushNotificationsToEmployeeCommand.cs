using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class CreatePushNotificationsToEmployeeCommand : IRequest<PushNotifications>
    {
        public PushNotifications PushNotifications { get; set; }
    }
}
