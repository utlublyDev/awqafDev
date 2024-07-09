
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
    public class OffersGetAllOffersByProviderIdQueryHandler : IRequestHandler<OffersGetAllOffersByProviderIdQuery, IEnumerable<Offers>>
    {
        private IReadOnlyOffersRepository _offersRepository;

        public OffersGetAllOffersByProviderIdQueryHandler(
            IReadOnlyOffersRepository offersRepository)
        {
            _offersRepository = offersRepository;
        }

        public async Task<IEnumerable<Offers>> Handle(OffersGetAllOffersByProviderIdQuery request, CancellationToken cancellationToken)
        {

//get all offers by provider id
            var page = await _offersRepository.getAllOffersByProviderId(request.ProviderId);

         
            return page;
        }
    }
}
