using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class ProvidersGetAllVipQueryHandler : IRequestHandler<ProvidersGetAllVipQuery, IEnumerable<Providers>>
    {
        private IReadOnlyProvidersRepository _providersRepository;

        public ProvidersGetAllVipQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<IEnumerable<Providers>> Handle(ProvidersGetAllVipQuery request, CancellationToken cancellationToken)
        {
            var page = await _providersRepository.getAllProviderVip();
            return page;
        }
    }
}
