
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class NotificationGetQueryHandler : IRequestHandler<NotificationGetQuery, Notification>
    {
        private IReadOnlyNotificationRepository _notificationRepository;

        public NotificationGetQueryHandler(
            IReadOnlyNotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<Notification> Handle(NotificationGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _notificationRepository.QueryHelper()
                .GetOneAsync(notification => notification.Id == request.Id);
            return entity;
        }
    }
}
