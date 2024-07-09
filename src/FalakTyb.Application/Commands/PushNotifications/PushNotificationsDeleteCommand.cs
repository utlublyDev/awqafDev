using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class PushNotificationsDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
