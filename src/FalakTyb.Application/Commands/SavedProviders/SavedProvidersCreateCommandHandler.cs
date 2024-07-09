
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class SavedProvidersCreateCommandHandler : IRequestHandler<SavedProvidersCreateCommand, SavedProviders>
    {
        private ISavedProvidersRepository _savedProvidersRepository;

        public SavedProvidersCreateCommandHandler(
            ISavedProvidersRepository savedProvidersRepository)
        {
            _savedProvidersRepository = savedProvidersRepository;
        }

        public async Task<SavedProviders> Handle(SavedProvidersCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _savedProvidersRepository.CreateOrUpdateAsync(command.SavedProviders);
            await _savedProvidersRepository.SaveChangesAsync();
            return entity;
        }
    }
}
