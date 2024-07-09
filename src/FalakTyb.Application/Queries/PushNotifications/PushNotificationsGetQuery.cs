
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class PushNotificationsGetQuery : IRequest<PushNotifications>
    {
        public long Id { get; set; }
    }
}
