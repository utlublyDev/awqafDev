
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class SavedProvidersGetQueryHandler : IRequestHandler<SavedProvidersGetQuery, SavedProviders>
    {
        private IReadOnlySavedProvidersRepository _savedProvidersRepository;

        public SavedProvidersGetQueryHandler(
            IReadOnlySavedProvidersRepository savedProvidersRepository)
        {
            _savedProvidersRepository = savedProvidersRepository;
        }

        public async Task<SavedProviders> Handle(SavedProvidersGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _savedProvidersRepository.QueryHelper()
                .GetOneAsync(savedProviders => savedProviders.Id == request.Id);
            return entity;
        }
    }
}
