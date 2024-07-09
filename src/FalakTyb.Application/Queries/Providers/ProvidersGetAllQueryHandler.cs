
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class ProvidersGetAllQueryHandler : IRequestHandler<ProvidersGetAllQuery, IPage<Providers>>
    {
        private IReadOnlyProvidersRepository _providersRepository;

        public ProvidersGetAllQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<IPage<Providers>> Handle(ProvidersGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _providersRepository.QueryHelper()
                .Include(providers => providers.ProvidersCategories)
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
