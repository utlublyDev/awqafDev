
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ProvidersCategoriesUpdateCommandHandler : IRequestHandler<ProvidersCategoriesUpdateCommand, ProvidersCategories>
    {
        private IProvidersCategoriesRepository _providersCategoriesRepository;

        public ProvidersCategoriesUpdateCommandHandler(
            IProvidersCategoriesRepository providersCategoriesRepository)
        {
            _providersCategoriesRepository = providersCategoriesRepository;
        }

        public async Task<ProvidersCategories> Handle(ProvidersCategoriesUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _providersCategoriesRepository.CreateOrUpdateAsync(command.ProvidersCategories);
            await _providersCategoriesRepository.SaveChangesAsync();
            return entity;
        }
    }
}
