
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class ReviewsAndRatingGetQueryHandler : IRequestHandler<ReviewsAndRatingGetQuery, ReviewsAndRating>
    {
        private IReadOnlyReviewsAndRatingRepository _reviewsAndRatingRepository;

        public ReviewsAndRatingGetQueryHandler(
            IReadOnlyReviewsAndRatingRepository reviewsAndRatingRepository)
        {
            _reviewsAndRatingRepository = reviewsAndRatingRepository;
        }

        public async Task<ReviewsAndRating> Handle(ReviewsAndRatingGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _reviewsAndRatingRepository.QueryHelper()
                .GetOneAsync(reviewsAndRating => reviewsAndRating.Id == request.Id);
            return entity;
        }
    }
}
