
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class PushNotificationsDeleteCommandHandler : IRequestHandler<PushNotificationsDeleteCommand, Unit>
    {
        private IPushNotificationsRepository _pushNotificationsRepository;

        public PushNotificationsDeleteCommandHandler(
            IPushNotificationsRepository pushNotificationsRepository)
        {
            _pushNotificationsRepository = pushNotificationsRepository;
        }

        public async Task<Unit> Handle(PushNotificationsDeleteCommand command, CancellationToken cancellationToken)
        {
            await _pushNotificationsRepository.DeleteByIdAsync(command.Id);
            await _pushNotificationsRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
