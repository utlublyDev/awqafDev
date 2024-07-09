
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class NotificationCreateCommandHandler : IRequestHandler<NotificationCreateCommand, Notification>
    {
        private INotificationRepository _notificationRepository;

        public NotificationCreateCommandHandler(
            INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<Notification> Handle(NotificationCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _notificationRepository.CreateOrUpdateAsync(command.Notification);
            await _notificationRepository.SaveChangesAsync();
            return entity;
        }
    }
}
