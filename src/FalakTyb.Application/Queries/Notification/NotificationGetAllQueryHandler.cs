
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class NotificationGetAllQueryHandler : IRequestHandler<NotificationGetAllQuery, IPage<Notification>>
    {
        private IReadOnlyNotificationRepository _notificationRepository;

        public NotificationGetAllQueryHandler(
            IReadOnlyNotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<IPage<Notification>> Handle(NotificationGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _notificationRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
