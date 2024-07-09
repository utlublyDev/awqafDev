
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class OffersGetAllQueryHandler : IRequestHandler<OffersGetAllQuery, IPage<Offers>>
    {
        private IReadOnlyOffersRepository _offersRepository;

        public OffersGetAllQueryHandler(
            IReadOnlyOffersRepository offersRepository)
        {
            _offersRepository = offersRepository;
        }

        public async Task<IPage<Offers>> Handle(OffersGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _offersRepository.QueryHelper()
                .Include(offers => offers.OffersCategories)
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
