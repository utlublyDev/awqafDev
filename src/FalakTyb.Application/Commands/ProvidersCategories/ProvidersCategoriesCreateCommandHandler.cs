
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ProvidersCategoriesCreateCommandHandler : IRequestHandler<ProvidersCategoriesCreateCommand, ProvidersCategories>
    {
        private IProvidersCategoriesRepository _providersCategoriesRepository;

        public ProvidersCategoriesCreateCommandHandler(
            IProvidersCategoriesRepository providersCategoriesRepository)
        {
            _providersCategoriesRepository = providersCategoriesRepository;
        }

        public async Task<ProvidersCategories> Handle(ProvidersCategoriesCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _providersCategoriesRepository.CreateOrUpdateAsync(command.ProvidersCategories);
            await _providersCategoriesRepository.SaveChangesAsync();
            return entity;
        }
    }
}
