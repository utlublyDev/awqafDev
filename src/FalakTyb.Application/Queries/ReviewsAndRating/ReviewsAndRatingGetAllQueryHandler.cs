
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class ReviewsAndRatingGetAllQueryHandler : IRequestHandler<ReviewsAndRatingGetAllQuery, IPage<ReviewsAndRating>>
    {
        private IReadOnlyReviewsAndRatingRepository _reviewsAndRatingRepository;

        public ReviewsAndRatingGetAllQueryHandler(
            IReadOnlyReviewsAndRatingRepository reviewsAndRatingRepository)
        {
            _reviewsAndRatingRepository = reviewsAndRatingRepository;
        }

        public async Task<IPage<ReviewsAndRating>> Handle(ReviewsAndRatingGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _reviewsAndRatingRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
