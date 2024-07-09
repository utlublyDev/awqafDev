
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
    public class SearchOffersRangeQueryHandler : IRequestHandler<SearchOffersRangeQuery, IEnumerable<Offers>>
    {
        private IReadOnlyOffersRepository _offersRepository;

        public SearchOffersRangeQueryHandler(
            IReadOnlyOffersRepository offersRepository)
        {
            _offersRepository = offersRepository;
        }

        public async Task<IEnumerable<Offers>> Handle(SearchOffersRangeQuery request, CancellationToken cancellationToken)
        {

            var page = await _offersRepository.SearchOffersRange(request.MinInput, request.MaxInput);

         
            return page;
        }
    }
}
