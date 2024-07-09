
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ReviewsAndRatingUpdateCommandHandler : IRequestHandler<ReviewsAndRatingUpdateCommand, ReviewsAndRating>
    {
        private IReviewsAndRatingRepository _reviewsAndRatingRepository;

        public ReviewsAndRatingUpdateCommandHandler(
            IReviewsAndRatingRepository reviewsAndRatingRepository)
        {
            _reviewsAndRatingRepository = reviewsAndRatingRepository;
        }

        public async Task<ReviewsAndRating> Handle(ReviewsAndRatingUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _reviewsAndRatingRepository.CreateOrUpdateAsync(command.ReviewsAndRating);
            await _reviewsAndRatingRepository.SaveChangesAsync();
            return entity;
        }
    }
}
