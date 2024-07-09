using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class ProvidersGetAllByCategoryIdQueryHandler : IRequestHandler<ProvidersGetAllByCategoryIdQuery, IPage<Providers>>
    {
        private IReadOnlyProvidersRepository _providersRepository;

        public ProvidersGetAllByCategoryIdQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<IPage<Providers>> Handle(ProvidersGetAllByCategoryIdQuery request, CancellationToken cancellationToken)
        {
            var page = await _providersRepository.QueryHelper().Filter(x => x.ProvidersCategoriesId == request.CategoryId).GetPageAsync(request.Page);




            return page;
        }
    }
}
