
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class ProvidersCategoriesGetAllQueryHandler : IRequestHandler<ProvidersCategoriesGetAllQuery, IPage<ProvidersCategories>>
    {
        private IReadOnlyProvidersCategoriesRepository _providersCategoriesRepository;

        public ProvidersCategoriesGetAllQueryHandler(
            IReadOnlyProvidersCategoriesRepository providersCategoriesRepository)
        {
            _providersCategoriesRepository = providersCategoriesRepository;
        }

        public async Task<IPage<ProvidersCategories>> Handle(ProvidersCategoriesGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _providersCategoriesRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
