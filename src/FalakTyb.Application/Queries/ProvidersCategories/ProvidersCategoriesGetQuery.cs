
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ProvidersCategoriesGetQuery : IRequest<ProvidersCategories>
    {
        public long Id { get; set; }
    }
}
