
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class PushNotificationsGetAllQueryHandler : IRequestHandler<PushNotificationsGetAllQuery, IPage<PushNotifications>>
    {
        private IReadOnlyPushNotificationsRepository _pushNotificationsRepository;

        public PushNotificationsGetAllQueryHandler(
            IReadOnlyPushNotificationsRepository pushNotificationsRepository)
        {
            _pushNotificationsRepository = pushNotificationsRepository;
        }

        public async Task<IPage<PushNotifications>> Handle(PushNotificationsGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _pushNotificationsRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
