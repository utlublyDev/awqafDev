
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
//import IEnumerable 
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class ProvidersGetAllByMainProviderIdQueryHandler : IRequestHandler<ProvidersGetAllByMainProviderIdQuery, IEnumerable<Providers>>
    {
        private IReadOnlyProvidersRepository _providersRepository;

        public ProvidersGetAllByMainProviderIdQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<IEnumerable<Providers>> Handle(ProvidersGetAllByMainProviderIdQuery request, CancellationToken cancellationToken)
        {
            var list = await _providersRepository.GetAllByMainServiceId(request.MainProviderId);
            return list;
        }
    }
}
