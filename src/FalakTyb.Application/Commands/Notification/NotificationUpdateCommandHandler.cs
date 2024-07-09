
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class NotificationUpdateCommandHandler : IRequestHandler<NotificationUpdateCommand, Notification>
    {
        private INotificationRepository _notificationRepository;

        public NotificationUpdateCommandHandler(
            INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<Notification> Handle(NotificationUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _notificationRepository.CreateOrUpdateAsync(command.Notification);
            await _notificationRepository.SaveChangesAsync();
            return entity;
        }
    }
}
