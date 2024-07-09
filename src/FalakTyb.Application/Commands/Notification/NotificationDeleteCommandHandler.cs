
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class NotificationDeleteCommandHandler : IRequestHandler<NotificationDeleteCommand, Unit>
    {
        private INotificationRepository _notificationRepository;

        public NotificationDeleteCommandHandler(
            INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<Unit> Handle(NotificationDeleteCommand command, CancellationToken cancellationToken)
        {
            await _notificationRepository.DeleteByIdAsync(command.Id);
            await _notificationRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
