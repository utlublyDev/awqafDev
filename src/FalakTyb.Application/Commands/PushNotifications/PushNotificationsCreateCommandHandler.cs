
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class PushNotificationsCreateCommandHandler : IRequestHandler<PushNotificationsCreateCommand, PushNotifications>
    {
        private IPushNotificationsRepository _pushNotificationsRepository;

        public PushNotificationsCreateCommandHandler(
            IPushNotificationsRepository pushNotificationsRepository)
        {
            _pushNotificationsRepository = pushNotificationsRepository;
        }

        public async Task<PushNotifications> Handle(PushNotificationsCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _pushNotificationsRepository.CreateOrUpdateAsync(command.PushNotifications);
            await _pushNotificationsRepository.SaveChangesAsync();
            return entity;
        }
    }
}
