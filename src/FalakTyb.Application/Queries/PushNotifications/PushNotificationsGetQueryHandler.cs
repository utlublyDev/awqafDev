
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class PushNotificationsGetQueryHandler : IRequestHandler<PushNotificationsGetQuery, PushNotifications>
    {
        private IReadOnlyPushNotificationsRepository _pushNotificationsRepository;

        public PushNotificationsGetQueryHandler(
            IReadOnlyPushNotificationsRepository pushNotificationsRepository)
        {
            _pushNotificationsRepository = pushNotificationsRepository;
        }

        public async Task<PushNotifications> Handle(PushNotificationsGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _pushNotificationsRepository.QueryHelper()
                .GetOneAsync(pushNotifications => pushNotifications.Id == request.Id);
            return entity;
        }
    }
}
