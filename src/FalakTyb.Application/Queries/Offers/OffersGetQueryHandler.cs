
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class OffersGetQueryHandler : IRequestHandler<OffersGetQuery, Offers>
    {
        private IReadOnlyOffersRepository _offersRepository;

        public OffersGetQueryHandler(
            IReadOnlyOffersRepository offersRepository)
        {
            _offersRepository = offersRepository;
        }

        public async Task<Offers> Handle(OffersGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _offersRepository.QueryHelper()
                .Include(offers => offers.OffersCategories)
                .GetOneAsync(offers => offers.Id == request.Id);
            return entity;
        }
    }
}
