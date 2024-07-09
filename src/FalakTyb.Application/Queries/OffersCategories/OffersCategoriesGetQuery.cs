
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class OffersCategoriesGetQuery : IRequest<OffersCategories>
    {
        public long Id { get; set; }
    }
}
