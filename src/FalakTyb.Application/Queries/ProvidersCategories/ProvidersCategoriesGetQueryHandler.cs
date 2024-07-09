
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class ProvidersCategoriesGetQueryHandler : IRequestHandler<ProvidersCategoriesGetQuery, ProvidersCategories>
    {
        private IReadOnlyProvidersCategoriesRepository _providersCategoriesRepository;

        public ProvidersCategoriesGetQueryHandler(
            IReadOnlyProvidersCategoriesRepository providersCategoriesRepository)
        {
            _providersCategoriesRepository = providersCategoriesRepository;
        }

        public async Task<ProvidersCategories> Handle(ProvidersCategoriesGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _providersCategoriesRepository.QueryHelper()
                .GetOneAsync(providersCategories => providersCategories.Id == request.Id);
            return entity;
        }
    }
}
