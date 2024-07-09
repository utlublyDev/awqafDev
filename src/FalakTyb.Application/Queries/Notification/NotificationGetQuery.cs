
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class NotificationGetQuery : IRequest<Notification>
    {
        public long Id { get; set; }
    }
}
