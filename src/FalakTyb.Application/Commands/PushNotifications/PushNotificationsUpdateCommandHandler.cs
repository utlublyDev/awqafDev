
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class PushNotificationsUpdateCommandHandler : IRequestHandler<PushNotificationsUpdateCommand, PushNotifications>
    {
        private IPushNotificationsRepository _pushNotificationsRepository;

        public PushNotificationsUpdateCommandHandler(
            IPushNotificationsRepository pushNotificationsRepository)
        {
            _pushNotificationsRepository = pushNotificationsRepository;
        }

        public async Task<PushNotifications> Handle(PushNotificationsUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _pushNotificationsRepository.CreateOrUpdateAsync(command.PushNotifications);
            await _pushNotificationsRepository.SaveChangesAsync();
            return entity;
        }
    }
}
